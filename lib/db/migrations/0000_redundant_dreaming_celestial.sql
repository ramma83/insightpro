CREATE TABLE `customers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`contactPerson` text,
	`email` text,
	`phone` text,
	`notes` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` text PRIMARY KEY NOT NULL,
	`customerId` text NOT NULL,
	`name` text NOT NULL,
	`vendor` text NOT NULL,
	`systemType` text NOT NULL,
	`ipAddress` text NOT NULL,
	`notes` text,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`deviceId` text NOT NULL,
	`userId` text NOT NULL,
	`status` text DEFAULT 'pending',
	`progress` integer DEFAULT 0,
	`startedAt` integer,
	`completedAt` integer,
	`createdAt` integer DEFAULT (strftime('%s', 'now')),
	FOREIGN KEY (`deviceId`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`passwordHash` text NOT NULL,
	`role` text NOT NULL,
	`status` text DEFAULT 'active',
	`lastLogin` integer,
	`createdAt` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);