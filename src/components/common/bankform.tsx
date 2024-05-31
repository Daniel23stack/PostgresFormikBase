
import React, { useState,FC, ReactNode } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import style from '@/styles/bankforms.module.scss';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

type Props = {
  children: ReactNode;
  initialValues: Object;
  onSubmit: Function;
};

export const BankForm = (props: { children: ReactNode; initialValues: Object; onSubmit: Function; }) => {
  const { children, initialValues, onSubmit} = props;
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState<Object>(initialValues);

  const step:any = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values:Object): void => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values:Object):void => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  
const handleSubmit = async (values: Object) => {
  if (typeof step !== 'undefined') {
    if (step.props?.onSubmit) {
      await step.props.onSubmit(values);
    }
  }
  if (isLastStep) {
    return onSubmit(values);
  } else {
    next(values);
  }
 };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {formik => (
        <Form>
          <div className='text-center'>
            {step}
          </div>
          <br/>
          <div className='flex justify-center'>
            {stepNumber > 0 && (
              <button onClick={() => previous(formik.values)} type="button" className={style.backButton}>
                Back
              </button>
            )}
            <div>
              <button disabled={formik.isSubmitting} type="submit" className={style.nextButton}>
                {isLastStep ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export const BankStep = (props:any): ReactNode => {
  return <>{props.children}</>;
};
