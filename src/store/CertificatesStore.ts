import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export enum CertificateType {
  NOT_ACTIVATED = 'NOT_ACTIVATED',
  ACTIVATED = 'ACTIVATED'
}

export interface ICertificate {
  _id: string;
  value: number,
  number: number,
  code: number,
  status: CertificateType,
  activationDate: string
}

export default class CertificatesStore {
  public certificates: Array<ICertificate> | null = null;

  public isLoading: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  public setCertificates = (certificates: Array<ICertificate>) => {
    this.certificates = certificates
      .sort((a, b) => (a.activationDate ? a.activationDate.localeCompare(b.activationDate) : 0));
  };

  public fetchCertificates = (nominal: string): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICertificate>>('getCertificates', { nominal })
      .then((data) => {
        this.setCertificates(data);
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public activate = (number: number): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<ICertificate>('activateCertificate', undefined, { number })
      .then(async (data) => {
        if (this.certificates?.length) {
          const newCertificates = this.certificates
          // eslint-disable-next-line no-underscore-dangle
            .map(certificate => (certificate._id === data._id ? data : certificate));
          this.setCertificates(newCertificates);
          await this.sendImage(number);
        }
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public sendImage = (number: number): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<any>('sendCertificate', undefined, { number })
      .then(data => data)
      .finally(() => this.rootStore.setLoading(false));
  };
}
