import {
  Box,
  Fade,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ConditionalWrapper } from "./ConditionalWrapper";
import { initialSelectedRowState, SelectedRowData } from "../App";
import React from "react";
import { SubmitReviewForm } from "./SubmitReviewForm";

interface ReviewSectionProps {
  selectedRowData: SelectedRowData;
  setSelectedRowData: React.Dispatch<React.SetStateAction<SelectedRowData>>;
  successMessage: string | null;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const renderReviewContent = (
  selectedRowTitle: string,
  selectedRow: string | null,
  successMessage: string | null,
  setSuccessMessage: (message: string) => void
) => (
  <>
    <Typography variant="h4" component="h3">
      {selectedRowTitle}
    </Typography>
    <Typography variant="h6" component="h4" mb="1rem">
      Please leave a review below
    </Typography>
    <SubmitReviewForm
      successMessage={successMessage}
      setSuccessMessage={setSuccessMessage}
      selectedRow={selectedRow}
    />
  </>
);

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  selectedRowData,
  setSelectedRowData,
  successMessage,
  setSuccessMessage,
}) => {
  const theme = useTheme();
  const isSmallWindow = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box py={2}>
      <ConditionalWrapper
        condition={isSmallWindow}
        wrapper={(children) => (
          <Modal
            open={!!selectedRowData.id}
            onClose={() => setSelectedRowData(initialSelectedRowState)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              {children}
            </Box>
          </Modal>
        )}
        fallbackWrapper={(children) => (
          <Fade in={!!selectedRowData.id}>
            <Box>{children}</Box>
          </Fade>
        )}
      >
        {renderReviewContent(
          selectedRowData.title,
          selectedRowData.id,
          successMessage,
          setSuccessMessage
        )}
      </ConditionalWrapper>
    </Box>
  );
};
