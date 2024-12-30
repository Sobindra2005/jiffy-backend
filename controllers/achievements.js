const { Achievement } = require('../models/Achievements');

const getAchievementsByUserId = async () => {
    try {
        const userId = req.params.id;
        const achievements = await Achievement.find({ userId: mongoose.Types.ObjectId(userId) });
        res.status(201).json({ message: 'User created successfully', achievements});
    } catch (error) {
        console.error('Error retrieving achievements:', error);
        throw error;
    }
};

const addAchievementToUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const achievementData = req.body;
        const userAchievements = await Achievement.find({ userId: mongoose.Types.ObjectId(userId) });
        if (userAchievements.length > 0) {
            userAchievements.push(achievementData);
            await Achievement.updateOne({ userId: mongoose.Types.ObjectId(userId) }, { $set: { achievements: userAchievements } });
        } else {
            const achievement = new Achievement({ userId: mongoose.Types.ObjectId(userId), achievements: [achievementData] });
            await achievement.save();
        }
        res.status(201).json({ message: 'Achievement added successfully', achievements: userAchievements });
    } catch (error) {
        console.error('Error adding achievement:', error);
        throw error;
    }
};

module.exports = {
    getAchievementsByUserId,
    addAchievementToUser
};