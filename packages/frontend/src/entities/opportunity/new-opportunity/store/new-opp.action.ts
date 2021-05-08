import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoadingProps } from '../../../../common/types/loading-props.interface';
import { opportunityApiService } from '../../../../api-client/services/opportunity-api.service';
import { NewOpportunityState } from '../new-opp.interface';

export const fetchQuestionsWithAnswers = createAsyncThunk<
  NewOpportunityState,
  string,
  {
    rejectValue: LoadingProps;
  }
>('opportunity/getAllQuestions', async (accessToken, { rejectWithValue }) => {
  try {
    const allQuestions = await opportunityApiService.getAllQuestions(
      accessToken,
    );

    return {
      loading: false,
      loaded: true,
      hasError: false,
      message: '',
      questionsByCategory: allQuestions,
    };
  } catch (e) {
    return rejectWithValue({
      loaded: true,
      loading: false,
      message: `Could not fetch questions`,
      hasError: true,
    });
  }
});
