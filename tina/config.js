import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || "main";

export default defineConfig({
	branch,
	clientId: process.env.TINACLIENTID, // Get this from tina.io
	token: process.env.TINATOKEN, // Get this from tina.io
	apiURL: process.env.NODE_ENV === 'development' 
		? 'http://localhost:4001/graphql'
		: `https://content.tinajs.io/content/${process.env.TINACLIENTID}/github/${branch}`,

	build: {
		outputFolder: "admin",
		publicFolder: "public",
	},
	media: {
		tina: {
			mediaRoot: "assets",
			publicFolder: "public",
		},
	},
	schema: {
		collections: [
			{
				name: "post",
				label: "Posts",
				path: "posts",
				defaultItem: () => ({
					title: "New Post",
					added: new Date(),
					tags: [],
				}),
				ui: {
					dateFormat: "MMM DD YYYY",
					filename: {
						readonly: false,
						slugify: (values) => {
							return values?.slug?.toLowerCase().replace(/ /g, "-");
						},
					},
				},
				fields: [
					{
						name: "title",
						label: "Title",
						type: "string",
						isTitle: true,
						required: true,
					},
					{
						label: "Slug",
						name: "slug",
						type: "string",
						required: true,
					},
					{
						label: "Description",
						name: "description",
						type: "string",
						required: true,
					},
					{
						label: "Tags",
						name: "tags",
						type: "string",
						list: true,
						options: [
							{
								value: "data",
								label: "Data",
							},
							{
								value: "rl",
								label: "Reinforcement Learning",
							},
							{
								value: "economics",
								label: "Economics",
							},
							{
								value: "complexity",
								label: "Complexity",
							},
							{
								value: "experimentation",
								label: "Experimentation",
							},
							{
								value: "games",
								label: "Games",
							},
							{
								value: "personal",
								label: "Personal",
							},
							{
								value: "musings",
								label: "Musings",
							},
						],
					},
					{
						label: "Added",
						name: "added",
						type: "datetime",
						dateFormat: "MMM DD YYYY",
						required: true,
					},
					{
						label: "Updated",
						name: "updated",
						type: "datetime",
						dateFormat: "MMM DD YYYY",
					},
					{
						type: "rich-text",
						name: "body",
						label: "Body",
						isBody: true,
					},
				],
			},
		],
	},
	search: {
		tina: {
			indexerToken: process.env.TINASEARCH,
			stopwordLanguages: ["eng"],
		},
		indexBatchSize: 50,
		maxSearchIndexFieldLength: 100,
	},
});
