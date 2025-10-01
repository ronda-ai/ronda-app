import { NextRequest, NextResponse } from "next/server";
import { resolve } from "@/services/bootstrap";
import { SERVICE_KEYS } from "@/config/service-keys";
import { IStorageService } from "@/modules/storage/domain/interfaces/storage-service.interface";
import { getGridFSBucket } from "@/lib/mongodb";

const getStorageService = () => resolve<IStorageService>(SERVICE_KEYS.StorageService);

export async function GET(
    request: NextRequest, 
    { params }: { params: { filename: string } }
) {
    try {
        const filename = params.filename;
        const storageService = getStorageService();

        // We need metadata, so we interact with GridFS directly here
        const bucket = getGridFSBucket();
        const files = await bucket.find({ filename }).toArray();
        if (files.length === 0) {
            return new NextResponse('File not found', { status: 404 });
        }
        
        const fileMetadata = files[0].metadata;

        const audioStream = await storageService.getStream(filename);

        if (!audioStream) {
            return new NextResponse('File not found', { status: 404 });
        }

        const headers = new Headers();
        // The client always expects uncompressed WAV
        headers.set('Content-Type', fileMetadata?.contentType || 'audio/wav');
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return new Response(audioStream as any, { headers });

    } catch (error) {
        console.error('Error serving audio file:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
