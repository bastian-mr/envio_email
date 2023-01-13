import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private mailService: MailerService) {}

  @Get('envio-email')
  async plainTextEmail(@Query('toemail') toEmail) {
    try {
      await this.mailService.sendMail({
        to: toEmail,
        from: 'bastian.milla14@gmail.com',
        subject: 'implementar servicio de email',
        text: 'envio de email por medio de la api sendgrid',
      });
      return 'Correo enviado';
    } catch (error) {
      if (error.code === 'EENVELOPE')
        throw new BadRequestException(
          'ingrese correo  de destino a traves de parametros en la peticion get',
        );
      else throw new BadRequestException('revise la terminal ');
      console.log(error);
    }
  }
}
