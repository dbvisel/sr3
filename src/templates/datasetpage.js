import React from 'react';
import Layout from './../components/layout';
import Dataset from './../components/dataset';

// TODO: do we set dataset anything else?

export default function DataSetPage({ pageContext }) {
	const { reportData, data } = pageContext;
	let thisPath = `/${reportData.id}/dataset/${data.id}`;
	return (
		<Layout title={data.name} menu={reportData} thisPage={thisPath}>
			<article>
				<Dataset data={data} />
			</article>
		</Layout>
	);
}
