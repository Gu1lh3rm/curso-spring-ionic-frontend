import { RefDTO } from "./ref.dto";
import { FileDTO } from "./file.dto";

export interface ClienteFileDTO {
    cliente: RefDTO;
    file: FileDTO;
}