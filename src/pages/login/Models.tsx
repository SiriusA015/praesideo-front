export interface SectionConfig {
  title: string;
  subTitle?: string;
  description?: string;
  alternativeOptionQuestion?: string;
  alternativeOptionButtonLabel?: string;
  formConfig?: any;
}

export interface ActivationMessage {
  valid: boolean;
  message: string;
}
