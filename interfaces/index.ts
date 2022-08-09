export type EventBusBody =
  | {
      type: "PostCreated";
      data: {
        id: string;
        title: string;
      };
    }
  | {
      type: "CommentCreated";
      data: {
        id: string;
        content: string;
        postId: string;
        status: CommentStatus;
      };
    }
  | {
      type: "CommentModerated";
      data: {
        id: string;
        content: string;
        postId: string;
        status: CommentStatus;
      };
    };

export type Comment = {
  id: string;
  content: string;
  status: CommentStatus;
};

export type CommentStatus = "approved" | "pending" | "rejected";
