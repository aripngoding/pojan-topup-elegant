CREATE TABLE `denoms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`denom_key` text NOT NULL,
	`label` text NOT NULL,
	`price` integer NOT NULL,
	`bonus` text,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`invoice_number` text NOT NULL,
	`product_id` integer NOT NULL,
	`denom_id` integer NOT NULL,
	`product_name` text NOT NULL,
	`denom_label` text NOT NULL,
	`price` integer NOT NULL,
	`service_fee` integer DEFAULT 1000 NOT NULL,
	`total_price` integer NOT NULL,
	`user_id` text NOT NULL,
	`server_id` text,
	`email` text,
	`payment_method` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`paid_at` integer,
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`denom_id`) REFERENCES `denoms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_invoice_number_unique` ON `orders` (`invoice_number`);--> statement-breakpoint
CREATE TABLE `payment_methods` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`group` text NOT NULL,
	`name` text NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`publisher` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`unit` text NOT NULL,
	`needs_server` integer DEFAULT false NOT NULL,
	`tag` text,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);