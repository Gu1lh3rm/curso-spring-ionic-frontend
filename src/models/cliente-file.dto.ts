import { RefDTO } from "./ref.dto";

export interface ClienteFileDTO {
    name? : string;
    bucket? : string;
    generation? : string;
    metageneration? : string;
    contentType? : string;
    timeCreated? : string;
    updated? : string;
    storageClass? : string;
    size? : string;
    md5Hash? : string;
    contentEncoding? : string;
    contentDisposition? : string;
    crc32c? : string;
    etag? : string;
    downloadTokens? : string;
    cliente: RefDTO;
}