import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

// props:
// data: the data
// hideHeader: if true, hide headers
// perPage: number of rows to show perpage
// inLine: true if this is inline

// style this differently if props.inLine?

const TopNav = styled.nav`
	position: sticky;
	top: 0;
	background-color: var(--white);
	padding-bottom: 1em;
	z-index: 2;
`;

const DatasetH1 = styled.h1`
	margin: 0;
`;

const FilterP = styled.nav`
	display: flex;
	justify-content: space-between;
	max-width: 100%;
	align-items: center;
	margin-top: 1em;
	& p {
		margin: 0;
		user-select: none;
		& a {
			text-decoration: none;
			font-weight: bold;
			color: var(--black);
		}
	}
	& form {
		font-family: var(--headerFont);
		& input[type='text'] {
			border: 1px solid var(--borderColor);
			font-family: var(--headerFont);
			font-size: 1em;
			padding: 1px 3px;
		}
		& input[type='submit'] {
			cursor: pointer;
			margin-left: 8px;
			font-size: 1em;
			color: var(--black);
			font-weight: bold;
			background-color: var(--orange);
			border-radius: 6px;
			border: none;
			outline: none;
			padding: 3px 8px;
			&:hover {
				color: var(--borderColor);
			}
		}
	}
	@media screen and (max-width: 767px) {
		flex-direction: column;
		align-items: flex-start;
		& p {
			margin-bottom: 1em;
		}
	}
`;

const PaginationP = styled.nav`
	margin-top: 1em;
	user-select: none;
`;

const Arrow = styled.span`
	cursor: ${props => (props.grayOut ? 'default' : 'pointer')};
	user-select: none;
	color: ${props => (props.grayOut ? 'var(--borderColor)' : 'var(--black)')};
	&:hover {
		color: ${props => (props.grayOut ? 'var(--borderColor)' : 'var(--orange)')};
	}
`;

const StrongLink = styled.span`
	font-family: var(--headerFont);
	font-weight: bold;
	cursor: pointer;
	&:hover {
		color: var(--orange);
	}
`;

const DataTableWrapper = styled.div`
	padding-bottom: 1em;
	max-width: 100%;
	max-width: calc(100vw - 200px);
	position: relative;
	/* overflow-x: scroll; */
`;

const DataTable = styled.table`
	position: relative;
`;

const THead = styled.thead`
	background-color: #ddd;
`;

const THNoWrap = styled.th`
	white-space: nowrap;
	font-weight: bold;
	font-family: var(--headerFont);
	padding: 0 4px;
	background-color: #ddd;
	cursor: pointer;
	position: sticky;
	top: ${props => (props.hideHeaders ? '3em' : '5em')};
	&:before {
		content: '';
		position: absolute;
		background-color: var(--white);
		left: 0;
		top: -5em;
		width: 100%;
		height: 5em;
	}
`;

const TableCell = styled.td`
	white-space: nowrap;
	overflow-x: hidden;
	text-align: center;
	& a {
		color: var(--orange);
		font-family: var(--headerFont);
		text-decoration: none;
		&:hover {
			border-bottom: 1px solid var(--orange);
		}
	}
`;

const TdError = styled.td`
	padding-top: 1em;
	padding-bottom: 1em;
`;

const cloneObject = function(source) {
	if (Object.prototype.toString.call(source) === '[object Array]') {
		let clone = [];
		for (var i = 0; i < source.length; i++) {
			clone[i] = cloneObject(source[i]);
		}
		return clone;
	} else if (typeof source == 'object') {
		let clone = {};
		for (var prop in source) {
			if (source.hasOwnProperty(prop)) {
				clone[prop] = cloneObject(source[prop]);
			}
		}
		return clone;
	} else {
		return source;
	}
};

class Dataset extends React.Component {
	constructor(props) {
		super(props);
		this.state = { startPoint: 0, perPage: 50 };
		this.prevPage = this.prevPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.filterDataset = this.filterDataset.bind(this);
		this.unfilterDataset = this.unfilterDataset.bind(this);
	}
	componentDidMount() {
		let perPage = this.state.perPage;
		if (this.props.perPage) {
			perPage = this.props.perPage;
		}
		console.log(this.props);
		let endPoint = this.state.startPoint + perPage;
		let data = this.props.data;
		let visibleFields = [];
		let memo = [];
		for (let i = 0; i < data.fields.length; i++) {
			let thisField = cloneObject(data.fields[i]);
			if (!thisField.fieldHidden) {
				for (let j = 0; j < data.data.length; j++) {
					// this makes sure that the field is actually used
					if (data.data[j][thisField.fieldKey]) {
						if (memo.indexOf(thisField.fieldKey) < 0) {
							memo.push(thisField.fieldKey);
							visibleFields.push(thisField);
						}
					}
				}
			}
		}
		let outputData = [];
		for (let j = 0; j < data.data.length; j++) {
			let entry = data.data[j];
			let row = [];
			for (let i = 0; i < visibleFields.length; i++) {
				let column = cloneObject(visibleFields[i]);
				column.value = entry[visibleFields[i].fieldKey];
				row.push(column);
			}
			// TODO: should probably push other hidden field data into this too?
			outputData.push({ id: data.data[j].id || null, row: row });
		}
		let filteredData = cloneObject(outputData);
		let shownRecords = filteredData.slice(this.state.startPoint, this.state.startPoint + this.state.perPage);
		this.setState({
			perPage: perPage,
			visibleFields: visibleFields,
			outputData: outputData,
			filteredData: filteredData,
			totalLength: filteredData.length,
			shownRecords: shownRecords,
			reportName: data.name,
			reportID: data.reportID,
			datasetID: data.id,
			endPoint: endPoint,
			paginate: outputData.length > perPage
		});
	}
	prevPage() {
		if (this.state.startPoint > 0) {
			const newStartPoint = this.state.startPoint - this.state.perPage;
			let shownRecords = this.state.outputData.slice(newStartPoint, newStartPoint + this.state.perPage);
			this.setState({ startPoint: newStartPoint, shownRecords: shownRecords });
		}
	}
	nextPage() {
		if (this.state.startPoint + this.state.perPage <= this.state.totalLength) {
			const newStartPoint = this.state.startPoint + this.state.perPage;
			let shownRecords = this.state.outputData.slice(newStartPoint, newStartPoint + this.state.perPage);
			this.setState({ startPoint: newStartPoint, shownRecords: shownRecords });
		}
	}
	filterDataset(e) {
		e.preventDefault();
		let filterFor = String(e.target.querySelector('#searchfield').value).toLowerCase();
		let filteredData = cloneObject(this.state.outputData).filter(row => {
			let output = row.row.filter(column => {
				return (
					column.value &&
					String(column.value)
						.toLowerCase()
						.indexOf(filterFor) > -1
				);
			});
			return output.length;
		});
		let shownRecords = filteredData.slice(0, this.state.perPage);
		this.setState({ filteredData: filteredData, shownRecords: shownRecords, totalLength: filteredData.length });
	}
	unfilterDataset() {
		let filteredData = cloneObject(this.state.outputData);
		let shownRecords = filteredData.slice(0, this.state.perPage);
		this.setState({ filteredData: filteredData, shownRecords: shownRecords, totalLength: filteredData.length });
	}
	render() {
		return this.state.outputData ? (
			<div>
				{this.props.hideHeaders ? null : (
					<DatasetH1 inLine={this.props.inLine}>Dataset: {this.state.reportName}</DatasetH1>
				)}
				<TopNav>
					<FilterP>
						<p>
							Showing {this.state.filteredData.length} of {this.state.outputData.length} total records in this dataset.{' '}
							<StrongLink onClick={this.unfilterDataset}>See all.</StrongLink>
						</p>
						<form onSubmit={this.filterDataset}>
							<input type="text" id="searchfield" placeholder="Filter this dataset"></input>
							<input type="submit" value="Filter" />
						</form>
					</FilterP>
					{this.state.paginate ? (
						<PaginationP>
							<Arrow onClick={this.prevPage} grayOut={this.state.startPoint === 0}>
								←
							</Arrow>
							&nbsp;&nbsp;Page {this.state.startPoint / this.state.perPage + 1}/
							{Math.ceil(this.state.totalLength / this.state.perPage)}&nbsp;&nbsp;
							<Arrow
								onClick={this.nextPage}
								grayOut={
									this.state.startPoint / this.state.perPage + 1 ===
									Math.ceil(this.state.totalLength / this.state.perPage)
								}
							>
								→
							</Arrow>
						</PaginationP>
					) : null}
				</TopNav>
				<DataTableWrapper>
					<DataTable>
						<THead>
							<tr>
								{this.state.visibleFields.map((entry, key) => (
									<THNoWrap key={key} hideHeaders={this.props.hideHeaders}>
										{entry.fieldName}
									</THNoWrap>
								))}
							</tr>
						</THead>
						{this.state.shownRecords.length > 0 ? (
							<tbody>
								{this.state.shownRecords.map((row, key) => (
									<tr key={key}>
										{row.row.map((column, key) => {
											return column.fieldType && (column.fieldType === 'link' || column.fieldType === 'imagelink') ? (
												<TableCell key={key}>
													<Link to={`/${this.state.reportID}/dataset/${this.state.datasetID}/id/${row.id}`}>
														{column.value}
													</Link>
												</TableCell>
											) : (
												<TableCell key={key}>{column.value}</TableCell>
											);
										})}
									</tr>
								))}
							</tbody>
						) : (
							<tbody>
								<tr>
									<TdError colSpan={this.state.visibleFields.length}>
										Oh no! no records to show! <StrongLink onClick={this.unfilterDataset}>Start over?</StrongLink>
									</TdError>
								</tr>
							</tbody>
						)}
					</DataTable>
				</DataTableWrapper>
			</div>
		) : null;
	}
}

export default Dataset;
