import CustomIngredients from './queries/CustomIngredients.js';
import CustomRecipes from './queries/CustomRecipes.js';
import DailyRecords from './queries/DailyRecords.js';
import Profiles from './queries/Profiles.js';
import Users from './queries/Users.js';
import FavoriteFoods from './queries/FavoriteFoods.js';
import WeightLogs from './queries/weightLogs.js';
import Posts from './queries/Posts.js';
import Comments from './queries/Comments.js';

export default {
  ...CustomRecipes,
  ...CustomIngredients,
  ...DailyRecords,
  ...Profiles,
  ...Users,
  ...FavoriteFoods,
  ...WeightLogs,
  ...Posts,
  ...Comments,
};
