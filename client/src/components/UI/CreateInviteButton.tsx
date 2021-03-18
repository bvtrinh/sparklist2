import React, { useState } from "react";
import { createInvite } from "../../api/auth";
import { Button } from "@chakra-ui/react";

export const CreateInviteButton = () => {
  const [invite, setInvite] = useState("");
  const inviteHandler = async () => {
    const res = await createInvite();
    if (res.status === 200) {
      console.log("success!");
      setInvite(res.data.payload._id);
    } else console.log("fail!");
  };
  const inviteMsg = invite ? (
    <div>
      <p>Invite Created!</p>
      <p>
        Here's the <a href={`http://localhost:3000/invite/${invite}`}>link</a>
      </p>
    </div>
  ) : null;

  return (
    <div>
      <Button onClick={inviteHandler}>Create Invite!</Button>
      {inviteMsg}
    </div>
  );
};
