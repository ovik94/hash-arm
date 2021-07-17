export interface IAdmin {
  name: string;
}

export function rootStore() {
  return {
    admin: {} as IAdmin,

    setAdmin(data: IAdmin) {
      this.admin = { ...this.admin, ...data };
    }
  };
}

export type IStore = ReturnType<typeof rootStore>;
