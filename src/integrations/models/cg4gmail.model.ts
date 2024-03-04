export interface ApiResponse {
  product_name: string;
  action: string;
  allowed_usuage: number;
  remaining_usuage: number;
  allowed_install: number;
  message: string;
  chatgpt_api_key: string;
}