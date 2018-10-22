import { ClienteFileDTO } from "./cliente-file.dto";
import { FileDTO } from "./file.dto";

export interface ClienteDTO {
    id : string;
    nome : string;
    email : string;
    file: FileDTO;
}