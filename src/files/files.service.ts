import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {

    async saveAvatar(file): Promise<string>{
        try {
            const fileNames: string[] = [];
            const extension = file.originalname.slice(
              ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
            );

            const versions = [
                { suffix: 'original', width: undefined, height: undefined },
                { suffix: 'medium', width: 400, height: 400 },
                { suffix: 'minimal', width: 100, height: 100 },
            ];

            for (const version of versions) {
                const fileName = `${uuid.v4()}_${version.suffix}.${extension}`;

                const filePath = path.resolve(__dirname, '..', 'static');

                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true });
                }

                const imageBuffer = await sharp(file.buffer)
                  .resize(version.width, version.height)
                  .toBuffer();

                fs.writeFileSync(path.join(filePath, fileName), imageBuffer);
                fileNames.push(fileName);
            }

            return fileNames[0];
        }catch (e) {
            throw new HttpException('Error during recording on disk', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

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
