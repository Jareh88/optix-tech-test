import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHandleSubmit } from "../hooks/customHooks";

interface FormData {
  review: string;
}

interface SubmitReviewFormProps {
  successMessage: string | null;
  setSuccessMessage: (message: string) => void;
  selectedRow: string | null;
}

export const SubmitReviewForm: React.FC<SubmitReviewFormProps> = ({
  successMessage,
  setSuccessMessage,
  selectedRow,
}) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
  });

  const { onSubmit, isSubmitting } = useHandleSubmit(
    setSuccessMessage,
    setError
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        {/* 
          Would be a field with ID in the form, tying in state so we reset/save our input in progress per selection. 
        */}
        <Controller
          name="review"
          control={control}
          defaultValue="" // This would be something dynamic if the backend had it in store.
          rules={{
            maxLength: {
              value: 100,
              message: "Your message exceeds 100 characters",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="review"
              label="Review"
              variant="outlined"
              fullWidth
              error={!!errors.review}
              multiline
              rows={2}
            />
          )}
        />
        {/* Could have used helperText prop here but have found it falls short when things start to get complex. */}
        <>
          {errors.root && (
            <Typography variant="body1" color="error">
              {errors.root.serverError.message}
            </Typography>
          )}
          {errors.review && (
            <Typography variant="body1" color="error">
              {errors.review.message}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body1" color="success.main">
              {successMessage}
            </Typography>
          )}
        </>
      </Box>

      {/* Would add checks here if backend populated and feed back whether already reviewed or not when selected. I can dummy it on the frontend if required. */}
      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !selectedRow || selectedRow === null}
        >
          {/* I've used the LoadingButton on a previous project but this works fine when set properly/in theme */}
          {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
    </form>
  );
};
