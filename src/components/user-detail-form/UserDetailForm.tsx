import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Typography } from "@mui/material";
import yup from "../../core/yup-extended";
import useStore from "../../hooks/useStore";
import MuiForm from "../form-controls/MuiForm";
import MuiFormSelect from "../form-controls/MuiFormSelect";
import MuiFormInput from "../form-controls/MuiFormInput";
import MuiFormButton from "../form-controls/MuiFormButton";
import MuiFormMaskedInput from "../form-controls/MuiFormMaskedInput";
import useLocale from "../../hooks/useLocale";
import Locale from "./locale";
import { IUser } from "../../store/UserStore";
import { observer } from "mobx-react-lite";

export interface IUserDetailForm {
  name: string;
  role: string;
  phone?: string;
  password?: string;
}

interface IUserDetailFormProps {
  user?: IUser | null;
}

const UserDetailForm: FC<IUserDetailFormProps> = ({ user }) => {
  const { userStore, popupStore } = useStore();
  const locale = useLocale(Locale);

  const schema = yup.object({
    name: yup.string().required(),
    role: yup.string().required(),
    phone: yup.string(),
    password: yup.string(),
  });

  const methods = useForm<IUserDetailForm>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      role: user?.role || "",
      password: user?.password || "",
    },
  });

  const onSubmit: SubmitHandler<IUserDetailForm> = (data) => {
    if (user?.id) {
      userStore.editUser({ id: user.id, ...data }).then(() => {
        popupStore.closePopup();
      });
    } else {
      userStore.addUser(data).then(() => {
        popupStore.closePopup();
      });
    }
  };

  console.log(locale.roles, "locale.roles");

  return (
    <MuiForm methods={methods} onSubmit={onSubmit}>
      <Typography variant="h6" mb={3}>
        {locale.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <MuiFormInput name="name" label={locale.nameLabel} />
        </Grid>
        <Grid item xs={6}>
          <MuiFormSelect
            name="role"
            options={locale.roles}
            label={locale.roleLabel}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiFormMaskedInput
            mask="+7-###-###-##-##"
            name="phone"
            label={locale.phoneLabel}
          />
        </Grid>
        {userStore.user?.role === "supervisor" &&
          (user?.role === "admin" ||
            user?.role === "supervisor" ||
            user?.role === "teller") && (
            <Grid item xs={6}>
              <MuiFormInput
                name="password"
                type="password"
                label={locale.passwordLabel}
                helperText={locale.passwordHelper}
              />
            </Grid>
          )}
      </Grid>

      <MuiFormButton
        label={user?.id ? locale.buttons.update : locale.buttons.add}
        sx={{ mt: 3 }}
      />
    </MuiForm>
  );
};

export default observer(UserDetailForm);
