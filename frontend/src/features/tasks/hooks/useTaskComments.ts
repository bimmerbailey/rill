import { useCallback } from "react";
import { useMutation } from "@apollo/client/react";
import {
  CreateTaskCommentDocument,
  UpdateTaskCommentDocument,
  DeleteTaskCommentDocument,
  FindTaskDocument,
} from "@/graphql/generated/graphql";

interface UseTaskCommentsReturn {
  createComment: (taskID: string, message: string) => Promise<void>;
  updateComment: (commentID: string, message: string) => Promise<void>;
  deleteComment: (commentID: string) => Promise<void>;
  loading: boolean;
}

export function useTaskComments(): UseTaskCommentsReturn {
  const [createMutation, { loading: creating }] =
    useMutation(CreateTaskCommentDocument);
  const [updateMutation, { loading: updating }] =
    useMutation(UpdateTaskCommentDocument);
  const [deleteMutation, { loading: deleting }] =
    useMutation(DeleteTaskCommentDocument);

  const createComment = useCallback(
    async (taskID: string, message: string) => {
      await createMutation({
        variables: { taskID, message },
        update: (cache, { data }) => {
          if (!data?.createTaskComment) return;

          const newComment = data.createTaskComment.comment;

          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  comments: [...(prev.findTask.comments || []), newComment],
                },
              };
            },
          );
        },
      });
    },
    [createMutation],
  );

  const updateComment = useCallback(
    async (commentID: string, message: string) => {
      await updateMutation({
        variables: { commentID, message },
      });
    },
    [updateMutation],
  );

  const deleteComment = useCallback(
    async (commentID: string) => {
      await deleteMutation({
        variables: { commentID },
        update: (cache, { data }) => {
          if (!data?.deleteTaskComment) return;

          const { taskID, commentID: deletedId } = data.deleteTaskComment;

          cache.updateQuery(
            { query: FindTaskDocument, variables: { taskID } },
            (prev) => {
              if (!prev?.findTask) return prev;
              return {
                ...prev,
                findTask: {
                  ...prev.findTask,
                  comments: prev.findTask.comments?.filter(
                    (c) => c.id !== deletedId,
                  ),
                },
              };
            },
          );
        },
      });
    },
    [deleteMutation],
  );

  return {
    createComment,
    updateComment,
    deleteComment,
    loading: creating || updating || deleting,
  };
}
