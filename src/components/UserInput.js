import React, { useEffect } from 'react';
import { useState } from 'react';

const CLIENT_ID = 'f335f2513e7743fe8a2e3071f1c5eaa3';
const CLIENT_SECRET = 'd97ba9b6d2fd45b7afe3dc3ea9fb4d19';

function UserInput() {
	const [userValue, setUserValue] = useState('');
	const [accessToken, setAccessToken] = useState('');
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		let authParameters = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body:
				'grant_type=client_credentials&client_id=' +
				CLIENT_ID +
				'&client_secret=' +
				CLIENT_SECRET
		};

		fetch('https://accounts.spotify.com/api/token', authParameters)
			.then((response) => response.json())
			.then((data) => setAccessToken(data.access_token));
	}, []);

	async function handleSearch() {
		// console.log('Searching for ' + userValue);
		let searchParameter = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		};
		let artistID = await fetch(
			'https://api.spotify.com/v1/search?q=' + userValue + '&type=artist',
			searchParameter
		)
			.then((response) => response.json())
			.then((data) => {
				return data.artists.items[0].id;
			});
		// console.log(artistID);

		let fetchingAlbums = await fetch(
			'https://api.spotify.com/v1/artists/' +
				artistID +
				'/albums' +
				'?include_groups=album,single',
			searchParameter
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setAlbums([data.items]);
			});
		// console.log(fetchingAlbums)
	}
	console.log(albums);

	return (
		<div className='row text-center py-4 mt-4'>
			<div className='col-4 mx-auto'>
				<div
					className='input-group input-group-dynamic'
					style={{
						padding: '20px'
					}}
				>
					<input
						style={{
							padding: '15px',
							fontSize: '20px',
							width: ' 50vw'
						}}
						type='text'
						className='form-control'
						placeholder='Search artist name'
						value={userValue}
						onChange={(e) => {
							setUserValue(e.target.value);
						}}
					/>
				</div>
				<button
					className='btn btn-primary mt-2'
					type='button'
					id='searchButton'
					onClick={handleSearch}
				>
					Search
				</button>
			</div>
			<div className='card m-4'>
				<div className='table-responsive'>
					<table className='table align-items-center mb-0'>
						<thead>
							<tr>
								<th
									className='text-uppercase text-secondary text-xxl font-weight-bolder opacity-7'
									style={{ textAlign: 'left' }}
								>
									Artist
								</th>
								<th
									className='text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ps-2'
									style={{ textAlign: 'left' }}
								>
									Albums
								</th>
								<th
									className='text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ps-2'
									style={{ textAlign: 'left' }}
								>
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{albums.length >= 1
								? albums[0].map((i, index) => {
										console.log(i);
										return (
											<tr>
												<td>
													<div className='d-flex px-2 py-1'>
														<div>
															<img
																src={i.images[0].url}
																className='avatar avatar-sm me-3'
															/>
														</div>
														<div className='d-flex flex-column justify-content-center'>
															<h6 className='mb-0 text-xs'>
																{i.artists[0].name}
															</h6>
														</div>
													</div>
												</td>
												<td>
													<p
														className='text-xs font-weight-bold mb-0'
														style={{ textAlign: 'left' }}
													>
														{i.name}
													</p>
												</td>
												<td>
													<p
														className='text-xs font-weight-bold mb-0'
														style={{ textAlign: 'left' }}
													>
														{i.release_date}
													</p>
												</td>
											</tr>
										);
								  })
								: null}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserInput;
