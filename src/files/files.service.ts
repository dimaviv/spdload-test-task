import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {

    async createFile(file): Promise<string>{
        try {
            const extension = file.originalname.slice((file.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
            const fileName = uuid.v4() + '.' + extension
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive:true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName;
        }catch (e) {
            throw new HttpException('Error during recording on disk', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}
