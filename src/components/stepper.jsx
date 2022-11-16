import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import mainStore from '../store/mainStore';
import stepValidation from '../utility/stepValidation';

function MyStepper() {
  const steps = mainStore((state) => state.steps);
  const setStepError = mainStore((state) => state.setStepError);
  const setCurrentComponent = mainStore((state) => state.setCurrentComponent);

  const [activeStep, setActiveStep] = React.useState(0);

  const [isWait, setIsWait] = useState(false);

  const handleNext = async () => {
    setIsWait(true);
    const { status } = await stepValidation(activeStep);
    if (status) {
      setIsWait(false);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      if (steps.length - 1 === activeStep) {
        setTimeout(() => {
          setCurrentComponent('recorder');
        }, 1000);
      }
      return;
    }
    setStepError(activeStep);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              error={step.isError}
              optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <LoadingButton
                    disabled={step.isError}
                    loading={step.isError ? false : isWait}
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Final Check' : 'Check It'}
                  </LoadingButton>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
      <Paper square elevation={0} sx={{ p: 3 }}>
        <Typography>
          All steps completed - you&apos;re finished
          {' '}
          <br />
          Lets record!
        </Typography>
      </Paper>
      )}
    </Box>
  );
}

export default MyStepper;
