import React from 'react';

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-gradient-dark z-index-3 py-3'>
			<div className='container'>
				<a
					className='navbar-brand text-white'
					href=''
					rel='tooltip'
					data-placement='bottom'
					target='_blank'
					style={{
						fontSize: '20px'
					}}
				>
					Spotify App
				</a>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navigation'
					aria-controls='navigation'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<div className='collapse navbar-collapse' id='navigation'>
					<ul className='navbar-nav navbar-nav-hover mx-auto'>
						<li className='nav-item px-3'>
							<a className='nav-link text-white opacity-8'>Music</a>
						</li>

						<li className='nav-item px-3'>
							<a className='nav-link text-white opacity-8'>Artists</a>
						</li>

						<li className='nav-item px-3'>
							<a className='nav-link text-white opacity-8'>Albums</a>
						</li>

						<li className='nav-item px-3'>
							<a className='nav-link text-white opacity-8'>Support</a>
						</li>
					</ul>

					<ul className='navbar-nav ms-auto'>
						<button className='btn bg-gradient-primary mb-0'>
							Login/SignUp
						</button>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
