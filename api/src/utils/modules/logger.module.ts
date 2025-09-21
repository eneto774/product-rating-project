import { Global, Module, Logger } from '@nestjs/common';

@Global()
@Module({
  providers: [Logger],
  exports: [Logger], // exporta para que todos os outros módulos usem
})
export class LoggerModule {}
