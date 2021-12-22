import React, { FC, useEffect } from 'react';
import { Theme } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography, SxProps, Box } from '@mui/material';
import { observer } from 'mobx-react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Инструкции'
};

const styles: Record<string, SxProps<Theme>> = {
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: theme => ({
    color: theme.palette.text.secondary,
    lineHeight: '24px'
  }),
  text: theme => ({
    '& ul': {
      marginBottom: theme.spacing(2),
      paddingLeft: 0,
      listStyle: 'none'
    },
    '& li': {
      position: 'relative',
      paddingLeft: theme.spacing(3),
      marginBottom: theme.spacing(6)
    },
    '& li::before': {
      position: 'absolute',
      top: theme.spacing(1),
      left: 0,
      width: '12px',
      height: '1px',
      background: '#616161',
      content: '""'
    },
    '& ul li ul li::before': {
      position: 'absolute',
      top: theme.spacing(1),
      left: 0,
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: '#616161',
      content: '""'
    },
    '& ul li ul li': {
      marginBottom: theme.spacing(1)
    },
    '& h1': theme.typography.h3,
    '& h2': theme.typography.h4,
    '& p': theme.typography.body1
  })
};

const Instructions: FC = (): JSX.Element => {
  const locale = useLocale(Locale);
  const { instructionsStore } = useStore();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  useTitle(locale.title);

  useEffect(() => {
    if (!instructionsStore.instructions.length) {
      instructionsStore.fetchInstructions();
    }
  }, [instructionsStore.instructions]);

  const onChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: '32px' }}>{locale.title}</Typography>
      {
        instructionsStore.instructions.map(instruction => (
          <Accordion expanded={expanded === instruction.id} onChange={onChange(instruction.id)} key={instruction.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={instruction.id}
            >
              <Typography sx={styles.heading} variant="body1">{instruction.title}</Typography>
              <Typography sx={styles.secondaryHeading} variant="subtitle1">{instruction.subtitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={styles.text} dangerouslySetInnerHTML={{ __html: instruction.text }} />
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
};

export default observer(Instructions);
