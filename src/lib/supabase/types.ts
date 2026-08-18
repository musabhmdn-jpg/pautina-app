export type ProfileRole = "buyer" | "supplier";
export type VerificationStatus = "unverified" | "pending" | "verified" | "rejected";
export type CrVerificationStatus = "pending" | "approved" | "rejected";
export type CrVerificationSource = "landing_form" | "opportunity_modal";
export type RfqStatus = "draft" | "sent" | "quoted" | "closed";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: ProfileRole;
          company_name: string;
          cr_number: string | null;
          sijillat_number: string | null;
          sector: string | null;
          email: string | null;
          phone: string | null;
          verification_status: VerificationStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role: ProfileRole;
          company_name: string;
          cr_number?: string | null;
          sijillat_number?: string | null;
          sector?: string | null;
          email?: string | null;
          phone?: string | null;
          verification_status?: VerificationStatus;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      cr_verifications: {
        Row: {
          id: string;
          profile_id: string | null;
          company_name: string;
          cr_number: string | null;
          sijillat_number: string | null;
          sector: string | null;
          email: string;
          phone: string | null;
          notes: string | null;
          source: CrVerificationSource;
          status: CrVerificationStatus;
          reviewer_notes: string | null;
          submitted_at: string;
          reviewed_at: string | null;
        };
        Insert: {
          profile_id?: string | null;
          company_name: string;
          cr_number?: string | null;
          sijillat_number?: string | null;
          sector?: string | null;
          email: string;
          phone?: string | null;
          notes?: string | null;
          source?: CrVerificationSource;
          status?: CrVerificationStatus;
        };
        Update: Partial<Database["public"]["Tables"]["cr_verifications"]["Insert"]>;
        Relationships: [];
      };
      rfqs: {
        Row: {
          id: string;
          buyer_id: string;
          title: string;
          description: string | null;
          sector: string | null;
          deadline: string | null;
          estimated_value: number | null;
          status: RfqStatus;
          supplier_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          buyer_id: string;
          title: string;
          description?: string | null;
          sector?: string | null;
          deadline?: string | null;
          estimated_value?: number | null;
          status?: RfqStatus;
          supplier_count?: number;
        };
        Update: Partial<Database["public"]["Tables"]["rfqs"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
