import { env } from "@/env";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const wcApi = new WooCommerceRestApi({
	url: env.NEXT_PUBLIC_WOOCOMMERCE_URL,
	consumerKey: env.WOO_KEY,
	consumerSecret: env.WOO_SECRET,
	version: "wc/v3",
});
