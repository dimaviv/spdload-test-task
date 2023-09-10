import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';
import { avatarExtensions, avatarVersionsUpload, MAX_ALLOWED_AVATAR_SIZE_KB } from "../config/config";

@Injectable()
export class FilesService {

    async saveAvatar(file): Promise<string>{
        try {
            await this.checkFileSize(file)

            const fileNames: string[] = [];
            const extension = file.originalname.slice(
              ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2
            );

            if (!avatarExtensions.includes(extension)){
                throw new HttpException('File format is not allowed', HttpStatus.BAD_REQUEST)
            }

            for (const version of avatarVersionsUpload) {
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
            throw new HttpException(e.message, e.status)
        }
    }

    async checkFileSize(file, maxSizeKB = MAX_ALLOWED_AVATAR_SIZE_KB){
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > maxSizeKB) {
            throw new HttpException('File size is too big', HttpStatus.BAD_REQUEST)
        }
    };

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
