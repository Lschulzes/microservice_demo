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
      };
    };
