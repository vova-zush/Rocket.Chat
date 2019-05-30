import { Meteor } from 'meteor/meteor';

import { Users } from '../../app/models';

Meteor.publish('userCompany', function() {
	if (!this.userId) {
		return this.ready();
	}

	const handle = Users.find({
		company: {
			$exists: 1,
		},
	}, {
		fields: {
			username: 1,
			company: 1,
		},
	}).observeChanges({
		added: (_id, record) => this.added('own_user', _id, record),
		changed: (_id, record) => this.changed('own_user', _id, record),
		removed: (_id, record) => this.removed('own_user', _id, record),
	});

	this.ready();

	this.onStop(() => handle.stop());
});
