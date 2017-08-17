export function getById(req, data) {
    return req.get(`/thread`, data);
}