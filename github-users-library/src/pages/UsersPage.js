import React, { Suspense } from "react";
import UserCard from "../components/UserCard";
import { useLoaderData, defer, Await } from 'react-router-dom';

const UsersPage = (props) => {
  // return <UserCard />
  // data is automatically extracted from the response object.
  const { users } = useLoaderData();
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Await resolve={users}>
        {(usersInfo) => (usersInfo.map((eachUserInfo) => (<UserCard key={eachUserInfo.id} userInfo={eachUserInfo} />)))}
      </Await>
    </Suspense>
  )
}

export default UsersPage;

const loadUsers = async () => {
	try {
		const response = await fetch('https://api.github.com/users', 
		{ 
			headers: { 
				Authorization: 'Bearer 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',
				Accept: 'application/vnd.github+json', 
				'X-GitHub-Api-Version': '2022-11-28' 
			}
		});

		const resData = await response.json();
		console.log('resData: ', resData);
		const requestArrays = [];
		for (const eachUser of resData) {
			requestArrays.push(fetch(`https://api.github.com/users/${eachUser.login}`, 
			{ 
				headers: {
					Authorization: 'Bearer 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',
					Accept: 'application/vnd.github+json', 
					'X-GitHub-Api-Version': '2022-11-28' 
				}
			}));
		}
		let detailedResponses = await Promise.all(requestArrays);
		detailedResponses = detailedResponses.map((eachResponse) => eachResponse.json());
		detailedResponses = await Promise.all(detailedResponses);
		return detailedResponses;
	} catch (error) {
		console.log(error);
		throw new Response(JSON.stringify({ message: 'Could not fetch users from github' }), { status: 500 });
	}
}

export function loader() {
  return defer({
    users: loadUsers()
  })
}
