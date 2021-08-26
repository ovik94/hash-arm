import React, { FC, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTitle from '../hooks/useTitle';
import useLocale from '../hooks/useLocale';
import useStore from '../hooks/useStore';

const Locale = {
  title: 'Инструкции'
};

const useStyles = makeStyles(theme => createStyles({
  title: {
    marginBottom: theme.spacing(4)
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    lineHeight: '24px'
  },
  text: {
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
  }
}));

const Instructions: FC = (): JSX.Element => {
  const classes = useStyles();
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
      <Typography variant="h2" className={classes.title}>{locale.title}</Typography>
      {
        instructionsStore.instructions.map(instruction => (
          <Accordion expanded={expanded === instruction.id} onChange={onChange(instruction.id)} key={instruction.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={instruction.id}
            >
              <Typography className={classes.heading} variant="body1">{instruction.title}</Typography>
              <Typography className={classes.secondaryHeading} variant="subtitle1">{instruction.subtitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className={classes.text}
                dangerouslySetInnerHTML={{ __html: instruction.text }}
              />
            </AccordionDetails>
          </Accordion>
        ))
      }
    </div>
  );
};

export default observer(Instructions);
