import React from 'react';
import { Link } from 'gatsby';
import Layout from './../components/layout';

import TextWrapper from './../components/textwrapper.js';

const NotFoundPage = () => (
	<Layout title="404" menu={{}}>
		<TextWrapper>
			<h1>Nothing was found!</h1>
			<p>
				Try looking at one of the reports? Or go to the <Link to="/">home page</Link>.
			</p>
		</TextWrapper>
	</Layout>
);

export default NotFoundPage;
