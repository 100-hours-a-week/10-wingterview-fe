import apiClient from '@/api/apiClient'
import { API } from './endpoints'

export const submitProfile = async (profileData: ProfileFormData) => {
  try {
    const response = await apiClient.put<ApiResponse<null>>(
      API.PROFILE.SUBMIT,
      profileData
    )
    return response.data
  } catch (error) {
    console.error('프로필 전송 실패:', error)
    throw error
  }
}

export const fetchMyProfile = async () => {
  try {
    const response = await apiClient.get<ApiResponse<MyProfileData>>(
      API.PROFILE.ME
    )
    return response.data.data
  } catch (error) {
    console.error('사용자 정보 조회 실패:', error)
    throw error
  }
}

export const editProfile = async (
  profileData: ProfileFormData,
  userId: string
) => {
  try {
    const response = await apiClient.put<ApiResponse<null>>(
      API.PROFILE.EDIT(userId),
      profileData
    )
    return response.data
  } catch (error) {
    console.error('프로필 수정 실패:', error)
    throw error
  }
}
