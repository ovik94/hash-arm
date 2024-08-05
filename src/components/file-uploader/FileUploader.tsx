import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Typography, Box, Divider, IconButton, Button } from "@mui/material";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import PlusIcon from "@mui/icons-material/Add";
import { UseFormSetValue } from "react-hook-form";
import Locale from "./locale";
import styles from "./styles";
import useLocale from "../../hooks/useLocale";

interface IFileUploaderProps {
  setValue: UseFormSetValue<{ file?: File }>;
  file?: File;
  fileProcessed: boolean;
  onClear?: () => void;
  hasError?: boolean;
  accept?: string;
}

type State = "loaded" | "processed" | "error";

const FileUploader: FC<IFileUploaderProps> = ({
  setValue,
  file,
  onClear = () => {},
  fileProcessed = false,
  hasError = false,
  accept = "",
}) => {
  const locale = useLocale(Locale);
  const [state, setState] = useState<State>("loaded");

  useEffect(() => {
    if (fileProcessed && !hasError) {
      setState("processed");
    }

    if (hasError) {
      setState("error");
    }
  }, [fileProcessed, hasError]);

  const onChangeFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;

    if (!uploadedFiles) {
      return;
    }

    setValue("file", Array.from(uploadedFiles)[0]);
  };

  const onClearFile = () => {
    setValue("file", undefined);

    onClear();
  };

  return (
    <Box>
      <Box sx={styles.uploadButtonBlock}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlusIcon />}
          component="label"
          disabled={Boolean(file)}
        >
          {locale.button}
          <input
            type="file"
            hidden
            multiple
            value=""
            onChange={onChangeFiles}
            accept={accept}
          />
        </Button>

        <Box
          sx={styles.uploadHint}
          dangerouslySetInnerHTML={{ __html: locale.hint }}
        />
      </Box>

      {file && (
        <>
          <Divider />
          <Box sx={styles.fileItem}>
            <InsertDriveFileOutlined
              color="disabled"
              fontSize="large"
              sx={{ mb: 0.5 }}
            />
            <Box sx={styles.fileItemName}>
              <Typography variant="subtitle1">{file.name}</Typography>
              <Typography variant="caption">
                {locale.size(file.size)}
              </Typography>
            </Box>
            <Typography variant="caption">{locale.state[state]}</Typography>
            {!fileProcessed && (
              <IconButton
                sx={styles.fileItemClear}
                disableRipple
                onClick={onClearFile}
                size="small"
              >
                <DeleteOutlined sx={{ mt: 0.5 }} />
              </IconButton>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default FileUploader;
