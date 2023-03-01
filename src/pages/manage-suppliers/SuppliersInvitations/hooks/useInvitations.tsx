import { createContext, useContext } from "react";

import { INVITATIONS_TABS } from "../constants";

type InvitationsContextType = {
  handleInvitationChange?: (newTab: INVITATIONS_TABS, id?: number) => void;
};

const InvitationsContext = createContext<InvitationsContextType>({});

export function InvitationsProvider({
  children,
  value = {},
}: {
  children: JSX.Element;
  value: InvitationsContextType;
}) {
  return (
    <InvitationsContext.Provider value={value}>
      {children}
    </InvitationsContext.Provider>
  );
}

export const useInvitations = () => {
  return useContext<InvitationsContextType>(InvitationsContext);
};
