import React, { useState } from "react";

import { createInvite } from "../../api/auth";
import { Box, Link, Text, Button } from "@chakra-ui/react";

export const CreateInviteButton = () => {
  const [invite, setInvite] = useState("");
  const inviteHandler = async () => {
    const res = await createInvite();
    if (res.status === 200) {
      setInvite(res.data.payload._id);
    } else console.log("fail!");
  };
  const inviteMsg = invite ? (
    <Box>
      <Text>Invite Created!</Text>
      <Text>
        Here's the{" "}
        <Link color="blue" href={`http://localhost:3000/invite/${invite}`}>
          link
        </Link>
      </Text>
    </Box>
  ) : null;

  return (
    <div>
      <Button onClick={inviteHandler}>Create Invite!</Button>
      {inviteMsg}
    </div>
  );
};
