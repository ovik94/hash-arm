import React, { createRef, FC, forwardRef } from 'react';
import MaskedInput from 'react-text-mask';
import MuiFormInput, { IMuiInputProps } from './MuiFormInput';

export const MaskTokensMap: Record<string, string | RegExp> = {
  '#': /\d/
};

interface IMaskTextFieldProps {
  showMask: boolean;
  mask: Array<string | RegExp> | string;
  placeholder?: string;
}

const MaskTextField: FC<IMaskTextFieldProps> = forwardRef(({
  showMask,
  mask,
  placeholder,
  ...other
}, inputRef) => {
  const transformedMask: Array<string | RegExp> = Array.isArray(mask) ? mask : mask.split('').map((i) => {
    if (MaskTokensMap[i]) {
      return MaskTokensMap[i];
    }

    return i;
  });

  return (
    <MaskedInput
      {...other}
      // ref={ref}
      ref={(ref: any) => {
        if (inputRef && typeof inputRef === 'function') {
          inputRef(ref ? ref.inputElement : null);
        }
      }}
      mask={transformedMask}
      placeholderChar={placeholder}
      showMask={false}
      guide={false}
    />
  );
});

export interface IMuiMaskedInputProps extends IMuiInputProps {
  mask: Array<string | RegExp> | string;
  showMask?: boolean,
  placeholder?: string,
}

const MuiFormMaskedInput: FC<IMuiMaskedInputProps> = ({
  mask,
  showMask = true,
  placeholder,
  ...other
}) => {
  const ref = createRef<HTMLInputElement>();

  return (
    <MuiFormInput
      {...other}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: MaskTextField,
        inputProps: { mask, placeholder, showMask, ref }
      }}
    />
  );
};

export default MuiFormMaskedInput;
