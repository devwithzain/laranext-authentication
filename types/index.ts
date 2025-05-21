export type ThooksProps = {
   isOpen: boolean;
   onOpen: () => void;
   onClose: () => void;
};

export type TModalProps = {
   isOpen?: boolean;
   onClose: () => void;
   body?: React.ReactElement;
};

export type TuserProps = {
   id: bigint;
   name: string;
   email: string;
   image: string | null;
   role: string;
   provider?: string;
   provider_id?: string;
   email_verified_at?: string;
   created_at: Date | null;
   updated_at: Date | null;
};