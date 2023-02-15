import { useCallback, useState } from "react";
import useDataRef from "./useDataRef";

/**
 *
 * @param {StepperHookOptions} options
 * @returns
 */
function useStepper(options = {}) {
  const minStep = options.minStep || 0;
  const maxStep = options.maxStep;
  const initialStep =
    parseInt(options?.initialStep) >= minStep ? options?.initialStep : minStep;
  const initialHistory =
    options?.initialHistory ||
    (parseInt(options.step) >= minStep
      ? [parseInt(options.step)]
      : [initialStep]);

  const [_step, _onStepChange] = useState(initialStep);
  const [_history, _onHistoryChange] = useState(initialHistory);

  const {
    step = _step,
    history = _history,
    onStepChange = _onStepChange,
    onHistoryChange = _onHistoryChange,
  } = options;

  const dataRef = useDataRef({
    initialStep,
    initialHistory,
    minStep,
    maxStep,
    step,
    history,
    onStepChange,
    onHistoryChange,
  });

  const canPrevStep = useCallback(() => {
    return dataRef.current.step > dataRef.current.minStep;
  }, [dataRef]);

  const canNextStep = useCallback(() => {
    return dataRef.current.step < dataRef.current.maxStep;
  }, [dataRef]);

  const nextStep = useCallback(
    (step = parseInt(dataRef.current.step) + 1) => {
      const newStep = parseInt(step);
      dataRef.current.onStepChange(newStep);
      dataRef.current.onHistoryChange([...dataRef.current.history, step]);
    },
    [dataRef]
  );

  const prevStep = useCallback(
    (step) => {
      const history = [...dataRef.current.history];
      history.pop();
      if (!history.length) {
        history.push(
          parseInt(dataRef.current.step) > 0
            ? parseInt(dataRef.current.step) - 1
            : parseInt(dataRef.current.step)
        );
      }
      const newStep = history[history.length - 1];
      dataRef.current.onStepChange(newStep);
      dataRef.current.onHistoryChange(history);
    },
    [dataRef]
  );

  const reset = useCallback(
    (step = parseInt(dataRef.current.initialStep)) => {
      const newStep = parseInt(step);
      dataRef.current.onStepChange(newStep);
      dataRef.current.onHistoryChange([newStep]);
    },
    [dataRef]
  );

  return {
    history,
    step,
    nextStep,
    prevStep,
    canNextStep,
    canPrevStep,
    reset,
  };
}

export default useStepper;

/**
 * @typedef {{
 * minStep: number;
 * maxStep: number;
 * initialStep: number;
 * step: number;
 * onStepChange: (step: number) => void;
 * initialHistory: number[];
 * history: number[];
 * onHistoryChange: (history: number[]) => void;
 * }} StepperHookOptions
 */
