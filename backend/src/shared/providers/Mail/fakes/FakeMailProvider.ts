import IMailProvider from '../models/IMailProvider';

interface IMail {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMail[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
