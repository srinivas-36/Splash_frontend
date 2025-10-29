/**
 * Check if a user has a specific role or higher in a project
 * @param {Object} project - Project object containing team_members
 * @param {Object} user - Current user object with id
 * @param {string} requiredRole - Required role: 'owner', 'editor', or 'viewer'
 * @returns {boolean} - True if user has required role or higher
 */
export function hasProjectRole(project, user, requiredRole = 'viewer') {

    const roleHierarchy = {
        owner: 3,
        editor: 2,
        viewer: 1,
    }

    const userRoleLevel = roleHierarchy[project.userRole] || 0
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0

    return userRoleLevel >= requiredRoleLevel
}

/**
 * Check if user can edit the project (owner or editor)
 * @param {Object} project - Project object
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export function canEditProject(project, user) {
    return hasProjectRole(project, user, 'editor')
}

/**
 * Check if user is project owner
 * @param {Object} project - Project object
 * @param {Object} user - Current user object
 * @returns {boolean}
 */
export function isProjectOwner(project, user) {
    return hasProjectRole(project, user, 'owner')
}

/**
 * Get user's role in the project
 * @param {Object} project - Project object
 * @param {Object} user - Current user object
 * @returns {string|null} - User's role or null if not a member
 */
export function getUserProjectRole(project, user) {
    if (!project || !user || !project.team_members) {
        return null
    }

    const member = project.team_members.find(
        (m) => m.user_id === user.id || m.user_id === String(user.id)
    )

    return member?.role || null
}

