
import { StudentDTO } from '@/modules/student/application/dtos/student.dto';
import { IAnonymizationService, AnonymizedData, AnonymizationMapping } from '@/modules/shared/domain-types/anonymization-service.interface';

export class AnonymizationService implements IAnonymizationService {
  public anonymize<T>(data: T, studentList: Partial<StudentDTO>[]): AnonymizedData<T> {
    if (data === null || data === undefined) {
      return { anonymizedData: data, mapping: new Map() };
    }
    
    const idToAliasMap = new Map<string, string>();
    const aliasToNameMap = new Map<string, string>();

    studentList.forEach((s, index) => {
      if (!s.id || !s.name) return;
      const alias = `Student ${String.fromCharCode(65 + index)}`;
      idToAliasMap.set(s.id, alias);
      aliasToNameMap.set(alias, s.name);
    });

    const clonedData = JSON.parse(JSON.stringify(data));

    // This function will recursively traverse the data and replace names/IDs
    const recursiveAnonymize = (currentData: any): any => {
      if (Array.isArray(currentData)) {
        return currentData.map(item => recursiveAnonymize(item));
      }

      if (typeof currentData === 'object' && currentData !== null) {
        const newObj: { [key: string]: any } = {};
        for (const key in currentData) {
          if (Object.prototype.hasOwnProperty.call(currentData, key)) {
            if (key === 'name' && typeof currentData[key] === 'string') {
              const student = studentList.find(s => s.name === currentData[key]);
              if (student && student.id) {
                newObj[key] = idToAliasMap.get(student.id) || currentData[key];
              } else {
                newObj[key] = currentData[key];
              }
            } else if (key === 'goodRelations' || key === 'badRelations') {
                newObj[key] = (currentData[key] || []).map((id: string) => idToAliasMap.get(id)).filter(Boolean);
            }
            else {
              newObj[key] = recursiveAnonymize(currentData[key]);
            }
          }
        }
        return newObj;
      }
      return currentData;
    };
    
    // For when the top-level data is just a string array
     if (Array.isArray(clonedData) && clonedData.every(item => typeof item === 'string')) {
      const studentNames = clonedData as string[];
      const anonymizedNames = studentNames.map(name => {
          const student = studentList.find(s => s.name === name);
          return student && student.id ? (idToAliasMap.get(student.id) || name) : name;
      });
       return {
          anonymizedData: anonymizedNames as T,
          mapping: aliasToNameMap,
       };
    }

    const anonymizedData = recursiveAnonymize(clonedData);

    return {
      anonymizedData,
      mapping: aliasToNameMap,
    };
  }

  public deAnonymizeText(text: string, mapping: AnonymizationMapping): string {
    let deAnonymizedText = text;
    mapping.forEach((realName, alias) => {
      // Use a regex that looks for the alias as a whole word.
      // The (?<!\w) and (?!\w) are negative lookbehind and lookahead assertions.
      // They ensure that the alias is not preceded or followed by a word character (a-z, A-Z, 0-9, _).
      // This correctly handles unicode characters and prevents breaking words like "niño".
      const regex = new RegExp(`(?<!\\w)${alias}(?!\\w)`, 'g');
      deAnonymizedText = deAnonymizedText.replace(regex, realName);
    });
    return deAnonymizedText;
  }
}
