export interface WooProduct {
	id: number;
	name: string;
	slug: string;
	permalink: string;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	type: "simple" | "grouped" | "external" | "variable";
	status: "draft" | "pending" | "private" | "publish";
	featured: boolean;
	catalog_visibility: "visible" | "catalog" | "search" | "hidden";
	description: string;
	short_description: string;
	sku: string;
	global_unique_id?: string;
	price: string;
	regular_price: string;
	sale_price: string;
	date_on_sale_from?: string | null;
	date_on_sale_from_gmt?: string | null;
	date_on_sale_to?: string | null;
	date_on_sale_to_gmt?: string | null;
	price_html: string;
	on_sale: boolean;
	purchasable: boolean;
	total_sales: number;
	virtual: boolean;
	downloadable: boolean;
	downloads: WooDownload[];
	download_limit: number;
	download_expiry: number;
	external_url?: string;
	button_text?: string;
	tax_status: "taxable" | "shipping" | "none";
	tax_class: string;
	manage_stock: boolean;
	stock_quantity?: number | null;
	stock_status: "instock" | "outofstock" | "onbackorder";
	backorders: "no" | "notify" | "yes";
	backorders_allowed: boolean;
	backordered: boolean;
	sold_individually: boolean;
	weight?: string;
	dimensions: WooDimensions;
	shipping_required: boolean;
	shipping_taxable: boolean;
	shipping_class: string;
	shipping_class_id: number;
	reviews_allowed: boolean;
	average_rating: string;
	rating_count: number;
	related_ids: number[];
	upsell_ids: number[];
	cross_sell_ids: number[];
	parent_id: number;
	purchase_note: string;
	categories: WooCategory[];
	tags: WooTag[];
	brands: WooBrands[];
	images: WooImage[];
	attributes: WooAttribute[];
	default_attributes: WooDefaultAttribute[];
	variations: number[];
	grouped_products: number[];
	menu_order: number;
	meta_data: WooMetaData[];
}

// --- Subtypes ---

export interface WooDownload {
	id: string;
	name: string;
	file: string;
}

export interface WooDimensions {
	length: string;
	width: string;
	height: string;
}

export interface WooCategory {
	id: number;
	name: string;
	slug: string;
}

export interface WooTag {
	id: number;
	name: string;
	slug: string;
}
export interface WooBrands {
	id: number;
	name: string;
	slug: string;
}

export interface WooImage {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

export interface WooAttribute {
	id: number;
	name: string;
	position: number;
	visible: boolean;
	variation: boolean;
	options: string[];
}

export interface WooDefaultAttribute {
	id: number;
	name: string;
	option: string;
}

export interface WooVariationAttribute {
	id: number;
	name: string;
	option: string;
}

export interface WooMetaData {
	id: number;
	key: string;
	value: unknown;
	display_key?: string;
	display_value?: string;
}

export interface WooProductCategory {
	id: number; // Unique identifier
	name: string; // Category name
	slug: string; // Unique slug
	parent: number; // Parent category ID
	description: string; // HTML description
	display: "default" | "products" | "subcategories" | "both"; // Display type
	image: WooCategoryImage | null; // Category image
	menu_order: number; // Menu order for sorting
	count: number; // Number of published products
}

export interface WooCategoryImage {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	src: string;
	name: string;
	alt: string;
}

export interface WooProductVariation {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	description: string;
	permalink: string;
	sku: string;
	price: string;
	regular_price: string;
	sale_price: string;
	on_sale: boolean;
	purchasable: boolean;
	virtual: boolean;
	downloadable: boolean;
	downloads: WooDownload[];
	download_limit: number;
	download_expiry: number;
	tax_status: "taxable" | "shipping" | "none";
	tax_class: string;
	manage_stock: boolean;
	stock_quantity: number | null;
	stock_status: "instock" | "outofstock" | "onbackorder";
	backorders: "no" | "notify" | "yes";
	backorders_allowed: boolean;
	backordered: boolean;
	weight: string;
	dimensions: WooDimensions;
	shipping_class: string;
	shipping_class_id: number;
	image: WooImage;
	attributes: WooVariationAttribute[];
	menu_order: number;
	meta_data: WooMetaData[];
}

export interface WooProductReview {
	id: number;
	date_created: string;
	date_created_gmt: string;
	product_id: number;
	status: string;
	reviewer: string;
	reviewer_email: string;
	review: string;
	rating: number;
	verified: boolean;
	reviewer_avatar_urls: {
		24: string;
		48: string;
		96: string;
	};
}

export interface WooAddress {
	first_name: string;
	last_name: string;
	company?: string;
	address_1: string;
	address_2?: string;
	city: string;
	state: string;
	postcode: string;
	country: string;
	email?: string;
	phone?: string;
}

export interface WooCustomer {
	id: number;
	date_created: string;
	date_created_gmt: string;
	date_modified: string;
	date_modified_gmt: string;
	email: string;
	first_name: string;
	last_name: string;
	role: string;
	username: string;
	billing: WooAddress;
	shipping: WooAddress;
	is_paying_customer: boolean;
	avatar_url: string;
	meta_data: WooMetaData[];
}

export interface WooOrderLineItem {
	id: number;
	name: string;
	product_id: number;
	variation_id: number;
	quantity: number;
	tax_class: string;
	subtotal: string;
	subtotal_tax: string;
	total: string;
	total_tax: string;
	taxes: unknown[];
	meta_data: WooMetaData[];
	sku: string;
	price: number;
	image?: {
		id: string;
		src: string;
	};
}

export interface WooOrder {
	id: number;
	parent_id: number;
	status: string;
	currency: string;
	version: string;
	prices_include_tax: boolean;
	date_created: string;
	date_modified: string;
	discount_total: string;
	discount_tax: string;
	shipping_total: string;
	shipping_tax: string;
	cart_tax: string;
	total: string;
	total_tax: string;
	customer_id: number;
	order_key: string;
	billing: WooAddress;
	shipping: WooAddress;
	payment_method: string;
	payment_method_title: string;
	transaction_id: string;
	customer_ip_address: string;
	customer_user_agent: string;
	created_via: string;
	customer_note: string;
	date_completed: string | null;
	date_paid: string | null;
	cart_hash: string;
	number: string;
	meta_data: WooMetaData[];
	line_items: WooOrderLineItem[];
	tax_lines: unknown[];
	shipping_lines: unknown[];
	fee_lines: unknown[];
	coupon_lines: unknown[];
	refunds: unknown[];
	payment_url: string;
	is_editable: boolean;
	needs_payment: boolean;
	needs_processing: boolean;
	date_created_gmt: string;
	date_modified_gmt: string;
	date_completed_gmt: string | null;
	date_paid_gmt: string | null;
	currency_symbol: string;
}
