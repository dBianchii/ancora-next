import { toast } from "sonner";
import { useEffect, useState } from "react";
import { type JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "~/server/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decodedToken?.name;
        const identity = decodedToken.jti;

        if (identity) {
          setIdentity(identity);
        }

        if (name) {
          setName(name);
        }
      } catch {
        toast.error("Something went wrong");
      }
    };

    void createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};
