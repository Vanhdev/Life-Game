const FamilyNames = [
    'Nguyễn',
    'Trần',
    'Lê',
    'Phạm',
    'Hoàng',
    'Huỳnh',
    'Phan',
    'Vũ',
    'Võ',
    'Đặng',
    'Bùi',
    'Đỗ',
    'Hồ',
    'Ngô',
    'Dương',
    'Lý',
    'Ma',
    'Cao',
    'Phùng',
    'Đinh',
    'Chu'
]

const MiddleNames = [
    'Bảo',
    'Công',
    'Đức',
    'Đình',
    'Mai',
    'Mạnh',
    'Nhật',
    'Như',
    'Quỳnh',
    'Thảo',
    'Thanh',
    'Thành',
    'Thiện',
    'Thu',
    'Thủy',
    'Trâm',
    'Tuấn',
    'Vân',
    'Vi',
    'Vỹ',
    'Xuân',
    'Yên',
]

const MaleNames = [
    'An',
    'Anh',
    'Duy',
    'Hải',
    'Hiếu',
    'Huy',
    'Khải',
    'Khánh',
    'Minh',
    'Tùng'
]

const FemaleNames = [
    'An',
    'Chi',
    'Ngọc',
    'Quỳnh',
    'Yến',
    'Đào',
    'Vân',
    'Lan',
    'Hoài',
]

export const RandonName = (gender) => {
    const randomFamilyNames = Math.floor(Math.random() * FamilyNames.length);
    const familyName = FamilyNames[randomFamilyNames];
    const randomMiddleNames = Math.floor(Math.random() * MiddleNames.length);
    const middleName = MiddleNames[randomMiddleNames];
    if (gender == "male") {
        const randomNames = Math.floor(Math.random() * MaleNames.length);
        const Name = MaleNames[randomNames];
        return familyName + " " + middleName + " " + Name;
    }
    if (gender === "female") {
        const randomNames = Math.floor(Math.random() * FemaleNames.length);
        const Name = FemaleNames[randomNames];
        return familyName + " " + middleName + " " + Name;
    }
}