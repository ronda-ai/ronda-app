
type ServiceIdentifier<T = any> = string | symbol;

type Provider<T> = () => T;
interface Registration<T> {
  provider: Provider<T>;
  lifecycle: 'singleton' | 'transient';
  instance?: T; // For singletons
}

class DependencyContainer {
  private registry = new Map<ServiceIdentifier<any>, Registration<any>>();
  private resolving = new Set<ServiceIdentifier<any>>(); // To detect circular dependencies during resolution

  public register<T>(
    key: ServiceIdentifier<T>,
    provider: Provider<T>,
    options: { lifecycle: 'singleton' | 'transient' } = { lifecycle: 'singleton' }
  ): void {
    if (this.registry.has(key) && options.lifecycle === 'singleton' && this.registry.get(key)?.instance) {
      return;
    }
    this.registry.set(key, { provider, lifecycle: options.lifecycle });
  }

  public registerSingletonInstance<T>(key: ServiceIdentifier<T>, instance: T): void {
    if (this.registry.has(key)) {
    }
    this.registry.set(key, {
        provider: () => instance,
        lifecycle: 'singleton',
        instance: instance
    });
  }

  public resolve<T>(key: ServiceIdentifier<T>): T {
    if (this.resolving.has(key)) {
      const resolvingPath = Array.from(this.resolving).map(String).join(" -> ") + ` -> ${String(key)}`;
      // console.error(`DI_CONTAINER_ERROR: Circular dependency detected while resolving key '${String(key)}'. Path: ${resolvingPath}`);
      throw new Error(`DependencyContainer: Circular dependency detected for key '${String(key)}'. Path: ${resolvingPath}`);
    }

    const registration = this.registry.get(key);
    if (!registration) {
      console.error(`DI_CONTAINER_ERROR: Key '${String(key)}' NOT FOUND in registry. Current registry keys:`, Array.from(this.registry.keys()).join(', '));
      throw new Error(`DependencyContainer: No provider registered for key '${String(key)}'. Check service-identifiers.ts and bootstrap.ts.`);
    }

    this.resolving.add(key);

    try {
      if (registration.lifecycle === 'singleton') {
        if (!registration.instance) {
          // console.log(`DI_CONTAINER_INFO: Creating singleton instance for '${String(key)}'`);
          registration.instance = registration.provider();
        }
        return registration.instance;
      }
      // Transient
      // console.log(`DI_CONTAINER_INFO: Creating transient instance for '${String(key)}'`);
      return registration.provider();
    } finally {
      this.resolving.delete(key);
    }
  }

  public isRegistered<T>(key: ServiceIdentifier<T>): boolean {
    return this.registry.has(key);
  }

  public clear(): void {
    // console.log("DependencyContainer: Clearing all registrations and instances.");
    this.registry.clear();
    this.resolving.clear();
  }
}

export const container = new DependencyContainer();
